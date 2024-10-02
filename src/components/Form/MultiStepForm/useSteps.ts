import { reactive, toRef, ref, watch, type Ref } from 'vue'
import { chain, mapValues, values } from 'lodash'
import { getNode, createMessage, type FormKitNode } from '@formkit/core'

export function useSteps() {
  const activeStep = ref(0)
  const steps: Record<
    string,
    { valid: Ref<boolean>; blockingCount: number; errorCount: number; index: number; visited: boolean; id: string }
  > = reactive({})

  watch(activeStep, (newStep, oldStep) => {
    const oldStepId = `${values(steps).find(i => i.index === oldStep)?.id}`
    if (steps[oldStepId]) steps[oldStepId].visited = true
    const visitedSteps = chain(steps)
      .values()
      .filter(i => i.visited)
      .value()

    visitedSteps.forEach(step => {
      const node = getNode(step.id)
      node?.walk(n => n.store.set(createMessage({ key: 'submitted', value: true, visible: false })))
    })
  })

  const checkVisitedAll = () => mapValues(steps, s => (s.visited = true))

  const setStep = (delta: number) => {
    const stepsIndexes = chain(steps)
      .values()
      .map(i => i.index)
      .sort()
      .value()
    const currentIndex = stepsIndexes.indexOf(activeStep.value)
    const newIndex = currentIndex + delta

    if (newIndex > stepsIndexes.length - 1 || newIndex < 0) return

    activeStep.value = stepsIndexes[newIndex]
  }

  const stepPlugin = (node: FormKitNode) => {
    if (node.props.type !== 'group') return

    const { id = '', index } = node.props
    node.on('created', () => {
      steps[id] = steps[id] || { blockingCount: 0, errorCount: 0, id, index }
      if (node.context) steps[id].valid = toRef(node.context.state, 'valid')
    })
    node.on('destroying', () => {
      delete steps[id]
    })
    node.on('count:blocking', ({ payload: count }) => {
      if (steps[id]) steps[id].blockingCount = count
    })
    node.on('count:errors', ({ payload: count }) => {
      if (steps[id]) steps[id].errorCount = count
    })

    return
  }

  return { activeStep, steps, stepPlugin, setStep, checkVisitedAll }
}
