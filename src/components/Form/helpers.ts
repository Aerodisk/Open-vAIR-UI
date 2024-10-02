import { cloneDeep, isFunction, isArray } from 'lodash'
import type { FieldsBlockWithFields, FieldType, FieldsPropType, TabItem, TextFieldType, FieldsBlock } from './types'
import { type FormKitNode, getNode, type FormKitPlaceholderNode } from '@formkit/core'

export const isBlock = (fields: FieldType | FieldsBlockWithFields) => Boolean('fields' in fields)

export const textTransform = (value: string, transform: TextFieldType['textTransform']) => {
  switch (transform) {
    case 'upperCase':
      return value.toUpperCase()
    case 'lowerCase':
      return value.toLowerCase()
    default:
      return value
  }
}

const getFieldsFromBlock = (block: FieldsBlockWithFields | FieldType): FieldType[] => {
  if (!('fields' in block)) return [block]

  const fields = block.fields
  let result: FieldType[] = []
  fields.map(i => {
    if ('fields' in i) {
      return (result = [...result, ...getFieldsFromBlock(i)])
    } else {
      return result.push(i)
    }
  })
  return result
}
const flatFields = (fields: (FieldType | FieldsBlockWithFields)[] | FieldsPropType): FieldType[] => {
  const arr = isArray(fields) ? fields : fields.fields
  return arr.map(getFieldsFromBlock).flat()
}

export const getDefaultInitials = (fields: FieldsPropType | TabItem['fields']) => {
  const defaultsValues: Partial<Record<FieldType['type'], unknown>> = {
    select: null,
    multiselect: [],
    table: [],
    checkbox: false,
    radio: null,
    size: 0,
  }
  const getDefaultValue = (field: FieldType) => {
    if (field.type === 'table' && !field.multiple) return null
    return defaultsValues[field.type]
  }
  const result: Record<string, unknown> = {}
  const fieldsFlat = flatFields(fields)

  fieldsFlat.forEach(field => (result[field.name] = getDefaultValue(field)))

  return result
}

export const getInitialsForTab = (fields: FieldsPropType | TabItem['fields'], initials?: Record<string, unknown>) => {
  const result: Record<string, unknown> = {}

  if (!initials) return result

  const fieldsFlat = flatFields(fields)

  fieldsFlat.forEach(item => {
    result[item.name] = initials[item.name]
  })

  return result
}

export const prepareFields = (fields: (FieldType | FieldsBlockWithFields)[], formValues: unknown) => {
  const fieldModify = (item: FieldType) => {
    switch (item.type) {
      case 'select':
      case 'multiselect':
        item.options = isFunction(item.options) ? item.options(formValues) : item.options
        break
      case 'table':
        item.items = isFunction(item.items) ? item.items(formValues) : item.items
    }
    if (isFunction(item.disabled)) item.disabled = item.disabled(formValues)
    return item
  }

  const safeFields = cloneDeep(fields)
  const fieldsFlat = flatFields(safeFields)
  fieldsFlat.forEach(fieldModify)

  return safeFields
}

export const findFormField = (formId: string, fieldName: string): FormKitNode<unknown> | undefined => {
  const form = getNode(formId)
  const findField = (
    nodes?: (FormKitNode<unknown> | FormKitPlaceholderNode<unknown>)[]
  ): FormKitNode<unknown> | undefined => {
    if (!nodes) return
    const filteredNodes = nodes.filter((n): n is FormKitNode<unknown> => 'context' in n)

    for (const n of filteredNodes) {
      if (n.type === 'group') {
        const node = findField(n.children)
        if (!node) continue
        return node
      }
      if (n.name === fieldName) return n
    }
    return
  }
  return findField(form?.children)
}

export const callFieldsWatchers = (
  fields: (FieldType | FieldsBlockWithFields)[] | FieldsBlock,
  formValues: unknown,
  oldFormValues: unknown,
  formId: string
) => {
  const fieldsFlat = flatFields(fields)
  fieldsFlat
    .filter(i => Boolean(i.watch))
    .forEach(i => i.watch?.(formValues, oldFormValues, findFormField(formId, i.name) as FormKitNode<unknown>))
}

export const generateFormId = () => {
  let count = 0
  while (1) {
    const node = getNode(`form_${count}`)
    if (!node) break
    count++
  }
  return `form_${count}`
}

export const setFormError = (formId: string, message: string) => getNode(formId)?.setErrors(message)

export const setFormInputError = (formId: string, name: string, message: string) => {
  const node = findFormField(formId, name)
  if (!node || !('setErrors' in node)) return
  return node.setErrors(message)
}

export const getFormValues = (node: FormKitNode): Record<string, unknown> => {
  let parent = node.parent
  while (parent?.type !== 'group' && parent?.parent) parent = parent.parent
  if (!parent) return {}

  const vals = cloneDeep(parent.value) as Record<string, unknown>
  delete vals.__init
  return vals
}
