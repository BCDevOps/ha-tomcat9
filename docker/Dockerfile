FROM tomcat:9.0.27-jdk8-openjdk
ARG LOG4J_VERSION=2.12.1
COPY contrib/tomcat.patch /usr/local/tomcat/
COPY contrib/tomcat.sha1 /usr/local/tomcat/
RUN set -xe 
RUN apt-get update -qq 
RUN apt-get install -qq -y --no-upgrade patch 
RUN rm -rf /usr/local/tomcat/webapps/* 
RUN mkdir -p /usr/local/tomcat/conf/Catalina/localhost 
RUN chmod g+w /usr/local/tomcat/conf/Catalina/localhost
RUN chmod g+w /usr/local/tomcat/webapps 
RUN ( cd /usr/local/tomcat && sha1sum --check /usr/local/tomcat/tomcat.sha1 --status) && patch --batch --forward --unified  --strip=1 --directory=/usr/local/tomcat --input=/usr/local/tomcat/tomcat.patch 
RUN  mkdir -p /usr/local/tomcat/log4j/lib /usr/local/tomcat/log4j/conf 
RUN  curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-api/$LOG4J_VERSION/log4j-api-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j/lib/log4j-api-$LOG4J_VERSION.jar 
RUN  curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-core/$LOG4J_VERSION/log4j-core-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j/lib/log4j-core-$LOG4J_VERSION.jar 
RUN  curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-appserver/$LOG4J_VERSION/log4j-appserver-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j/lib/log4j-appserver-$LOG4J_VERSION.jar 
RUN  rm /usr/local/tomcat/conf/logging.properties 
RUN  curl -sSL https://repo1.maven.org/maven2/org/jolokia/jolokia-jvm/1.6.2/jolokia-jvm-1.6.2-agent.jar -o /usr/local/tomcat/bin/jolokia-jvm-1.6.2-agent.jar 


