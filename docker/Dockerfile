FROM tomcat:9.0.27-jdk8-openjdk
ARG LOG4J_VERSION=2.12.1
COPY contrib/tomcat.patch /usr/local/tomcat/
COPY contrib/tomcat.sha1 /usr/local/tomcat/
RUN set -xe && \
    apt-get update -qq && \
    apt-get install -qq -y --no-upgrade patch && \
    rm -rf /usr/local/tomcat/webapps/* && \
    mkdir -p /usr/local/tomcat/conf/Catalina/localhost && \
    chmod g+w /usr/local/tomcat/conf/Catalina/localhost && \
    chmod g+w /usr/local/tomcat/webapps && \
    ls -la /usr/local/tomcat/ && \
    ( cd /usr/local/tomcat && sha1sum --check /usr/local/tomcat/tomcat.sha1 --status) && \
    patch --batch --forward --unified  --strip=1 --directory=/usr/local/tomcat --input=/usr/local/tomcat/tomcat.patch && \
    mkdir -p /usr/local/tomcat/log4j2/lib /usr/local/tomcat/log4j2/conf && \
    curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-api/$LOG4J_VERSION/log4j-api-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j2/lib/log4j-api-$LOG4J_VERSION.jar && \
    curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-core/$LOG4J_VERSION/log4j-core-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j2/lib/log4j-core-$LOG4J_VERSION.jar && \
    curl -sSL https://repo1.maven.org/maven2/org/apache/logging/log4j/log4j-appserver/$LOG4J_VERSION/log4j-appserver-$LOG4J_VERSION.jar -o /usr/local/tomcat/log4j2/lib/log4j-appserver-$LOG4J_VERSION.jar && \
    rm /usr/local/tomcat/conf/logging.properties && \
    curl -sSL https://repo1.maven.org/maven2/org/jolokia/jolokia-jvm/1.6.2/jolokia-jvm-1.6.2-agent.jar -o /usr/local/tomcat/bin/jolokia-jvm-1.6.2-agent.jar && \
    apt-get remove -qq -y --purge patch && apt-get clean && set +x && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

VOLUME [ "/usr/local/tomcat/ext/webade/lib", "/usr/local/tomcat/ext/webade/classes", "/usr/local/tomcat/ext/keycloak/classes" ]
