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

#### Note: To run with existing docker configuration, you will not be needed to make any changes to the docker folder

# How to build image
## In Openshift
```
# NOTE: Switch to target namespace, or set `-n <namespace>` on all `oc` commands
# oc project ywinub-tools

# Process template, and create OpenShift resources
oc -n ywinub-tools process -f openshift/build.yaml SUFFIX=-cvarjao IMAGE_TAG_SUFFIX=-cvarjao | oc -n ywinub-tools create -f -

# Start a new build using the current repository in the working directory as source
oc -n ywinub-tools start-build bc/ha-tomcat9-cvarjao --from-repo=.

# NOTE: it includes all commits done locally, but not yet pushed
#       if all commits are already pushed, there is no need for `--from-repo=.`
```

## Locally

### Setup Tomcat locally
-- TBD --

### Build
if you are working ont he Dockerfile and the image itself, you may want to build locally using docker
```
cd docker
docker build -t ha-tomcat9:latest .
```
