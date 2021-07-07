# ha-tomcat9
Highly Available Tomcat 9 Image

## ./docker
    Contains the ha tomcat 9 configurations required to run Java App within a cluster
    To update the configuration files such as web.xml or server.xml, update the files under ./docker/contrib/patched and run ./docker/create-patch.sh 

## ./openshift
    Contains the default openshift build and deployment templates to run the vanilla tomcat deployment with no application
    Modify your application build and deployment templates accordingly to make use of this image, for example,
       -> Customize and build the tomcat 9 image in your workspace
       -> Update your application build.yaml to use this image for hosting your java application 
       -> Update your application deployment.yaml to add the rbac authorizations and roles required to run the tomcat in a cluster and don't forget to add the service account required to run your container under the spec.

#### Note: To run with existing docker configuration, you will not need to make any changes to the docker folder

# Building & Deploying the Image
## In Openshift (using NRDK)
```
# Build a image based on HEAD of pull request
npx @bcgov/nrdk build --pr=<number>

# Deploy the image previously built by a specific PR to "DEV"
npx @bcgov/nrdk deploy --pr=<number> --env=dev

# Deploy the image previously built by a specific PR to "TEST"
npx @bcgov/nrdk deploy --pr=<number> --env=test

# Deploy the image previously built by a specific PR to "PROD"
npx @bcgov/nrdk deploy --pr=<number> --env=prod
```

## In Openshift (via developer CLI)
```
NOTE: Switch to target namespace, or set `-n perrsi-tools` on all `oc` commands
    oc project perrsi-tools

Process template, and create OpenShift resources
    oc process -f openshift/build.yaml VERSION=0.1 SUFFIX=-6 SOURCE_GIT_REF=/refs/pull/6/head | oc apply -f -

VERSION and SUFFIX tag images using the pull request number and an incrementing major-minor version pair.
  -> If this is a bugfix, do not increment the version.
  -> If it is a major, breaking change, increment the major version.
  -> If it is a simple feature addition, increment the minor version.
If you are just running a one-off or experiment, you can use your name/idir or 'build' as a version and omit the suffix.

SOURCE_GIT_REF specifies which git branch will be used in the build.
  -> If you have a pull request open, you can use /refs/pull/#/head .
  -> If you have committed the changes to github, you can use the branch name.
  -> If you want to start a new build using the current repository in the working directory as source:
    oc start-build bc/ha-tomcat9-0.1-6 --from-repo=.

NOTE: This includes all commits done locally, but not yet pushed.
      If all commits are already pushed, there is no need for `--from-repo=.`

When making the image available in perrsi-prod, we update the version tag (without git pull #) to this new image.
We also update the 'latest' tag to this image.

    oc tag perrsi-tools/ha-tomcat9:0.1-6 perrsi-prod/ha-tomcat9:0.1 --reference-policy=local
    oc tag perrsi-tools/ha-tomcat9:0.1-6 perrsi-prod/ha-tomcat9:latest --reference-policy=local
```

## Locally

### Setup Tomcat locally
-- TBD --

### Build
If you are working on the Dockerfile and the image itself, you may want to build locally using docker
```
cd docker
docker build -t ha-tomcat9:latest .
```
