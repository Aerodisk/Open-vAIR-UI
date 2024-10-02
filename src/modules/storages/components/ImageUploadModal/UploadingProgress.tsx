import { defineComponent } from 'vue'
import { floor } from 'lodash'

import { ProgressLinearWidget } from '@/components/Widget'

const tPrefix = 'storages.images.actions.upload'

export const UploadingProgress = defineComponent({
  name: 'UploadingProgress',
  props: { uploading: Boolean, progress: Number },
  render() {
    return (
      <div
        style={{
          width: '220px',
          position: 'relative',
          fontSize: '12px',
          color: 'rgb(var(--v-theme-form-input-text))',
          opacity: this.uploading ? 1 : 0,
          transition: 'opacity 0.28s',
        }}
      >
        {this.$t(`${tPrefix}.uploadingProgress`)}
        <div
          style={{
            position: 'absolute',
            width: 'fit-content',
            zIndex: 1,
            top: '18px',
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        >
          {floor(this.progress || 0, 1)} %
        </div>
        <ProgressLinearWidget value={this.progress} height={12} noGradient color='primary' class='mt-1' />
      </div>
    )
  },
})
