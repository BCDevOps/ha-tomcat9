const BasicBuilder = require.main.exports.BasicBuilder
const OpenShiftClientX = require.main.exports.OpenShiftClientX
const path = require('path')

class MyBuilder {
  constructor(settings) {
    this.settings = settings
  }

  processTemplates(oc) {
    const phase = 'build'
    const phases = this.settings.phases
    const objects = []
    const commonParams = {
      NAME: phases[phase].name,
      SUFFIX: phases[phase].suffix,
      VERSION: phases[phase].tag,
      SOURCE_GIT_URL: oc.git.http_url,
      SOURCE_GIT_REF: oc.git.branch.merge,
    }
    const finalParams = Object.assign(commonParams, this.settings.buildParams)
    objects.push(
      ...oc.processDeploymentTemplate(oc.toFileUrl(path.resolve(__dirname, '../../openshift/build.yaml')), {
        param: finalParams,
      })
    )
    return objects
  }

  async build() {
    const settings = this.settings
    const phases = settings.phases
    const oc = new OpenShiftClientX(Object.assign({ namespace: phases.build.namespace }, settings.options))
    const processedTemplate = this.processTemplates(oc)
    const phase = 'build'
    oc.applyRecommendedLabels(
        processedTemplate,
        phases[phase].name,
        phase,
        phases[phase].changeId,
        phases[phase].instance
    )
    oc.applyAndBuild(processedTemplate)
  }
}

module.exports = exports = async (settings) => {
  await new MyBuilder(settings).build()
}
