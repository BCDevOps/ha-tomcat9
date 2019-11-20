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