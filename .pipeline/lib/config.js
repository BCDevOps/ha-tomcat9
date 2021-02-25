'use strict';
const OpenShiftClient = require.main.exports.OpenShiftClient

process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = class Config {
  constructor(options) {
    this.options = options
  }
  build(){
    const options = this.options
    const changeId = options.pr //aka pull-request
    const version = '0.1'
    const name = 'ha-tomcat9'
    const namespace = { build: 'perrsi-tools', dev: 'perrsi-dev', test: 'perrsi-prod', prod: 'perrsi-prod' }

    const phases0 = {
        namespace,
        name: { build: `${name}`, dev: `${name}`, test: `${name}`, prod: `${name}` },
        phase: { build: 'build', dev: 'dev', test: 'test', prod: 'prod' },
        changeId: { build: changeId, dev: changeId, test: changeId, prod: changeId },
        suffix: { build: `-build-${changeId}`, dev: `-dev-${changeId}`, test: `-test`, prod: `-prod` },
        tag: {
            build: `${version}-${changeId}`,
            dev: `${version}-${changeId}`,
            test: `${version}-${changeId}`,
            prod: `${version}`,
        },
        transient: { build: true, dev: true, test: false, prod: false },
        instance: {
          build: `${name}-build-${changeId}`,
          dev: `${name}-dev-${changeId}`,
          test: `${name}-test`,
          prod: `${name}-prod-${changeId}`,
      },
    }
    const phases = {}
    // Pivot configuration table, so that `phase name` becomes a top-level property
    // { namespace: { build: '-tools',  dev: '-dev'}}   ->  { build: { namespace: '-tools' }, dev: { namespace: '-dev' } }
    Object.keys(phases0).forEach(properyName => {
        const property = phases0[properyName]
        Object.keys(property).forEach(phaseName => {
            phases[phaseName] = phases[phaseName] || {}
            phases[phaseName][properyName] = property[phaseName]
        })
    })

    return {
        phases,
        options,
    }
  }
}
