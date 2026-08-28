import process from 'node:process'
import { defineConfig } from 'wormajs'
import { apifox, axios } from 'wormajs/plugin'

const projectId = process.env.APIFOX_PROJECT_ID
const apifoxToken = process.env.APIFOX_ACCESS_TOKEN

if (!projectId || !apifoxToken) {
  throw new Error('缺少 APIFOX_PROJECT_ID 或 APIFOX_ACCESS_TOKEN')
}

export default defineConfig({
  generator: [
    {
      output: 'src/views/screen/api/generated',
      serverName: 'PoliceScreen',
      type: 'module',
      docComment: true,
      plugins: [
        apifox({
          projectId,
          apifoxToken,
          oasVersion: '3.1',
          exportFormat: 'JSON'
        }),
        axios()
      ],
      handleApi(api) {
        if (!api.url.includes('/policeScreen/')) {
          return
        }

        api.operationId = api.url.split('/').at(-1)
        return api
      }
    }
  ]
})
