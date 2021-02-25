const OpenShiftClientX = require.main.exports.OpenShiftClientX
const path = require('path')

class MyDeployer {
  constructor(settings) {
    this.settings = settings
  }

  async deploy() {
    const phases = this.settings.phases
    const phase = this.settings.options.env
    const oc = new OpenShiftClientX(Object.assign({ namespace: phases.build.namespace }, this.settings.options))
    oc.tag([`${phases.build.name}:${phases.build.tag}`, `${phases[phase].namespace}/${phases[phase].name}:${phases[phase].tag}`], {'reference-policy': 'local'})
  }
}

module.exports = exports = async (settings) => {
  await new MyDeployer(settings).deploy()
}
