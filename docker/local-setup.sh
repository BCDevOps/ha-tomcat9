#!/usr/bin/env bash
set -e
TOMCAT_VERSION=9.0.27
TOMCAT_VERSION_MAJOR=${TOMCAT_VERSION%%.*} 

echo "Preparing Tomcat ${TOMCAT_VERSION} environment!"

if [ ! -f apache-tomcat-${TOMCAT_VERSION}.tar.gz ]; then
  echo "Downloading Tomcat ${TOMCAT_VERSION} ..."
  curl -sSL -o apache-tomcat-${TOMCAT_VERSION}.tar.gz https://archive.apache.org/dist/tomcat/tomcat-${TOMCAT_VERSION_MAJOR}/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz
fi

rm -rf .tomcat
mkdir .tomcat .tomcat-original 2>/dev/null || true
tar -xf apache-tomcat-${TOMCAT_VERSION}.tar.gz --strip 1 -C .tomcat
tar -xf apache-tomcat-${TOMCAT_VERSION}.tar.gz --strip 1 -C .tomcat-original

echo "Applying patch"
patch --batch --forward --unified  --strip=1 --directory=.tomcat < contrib/tomcat.patch
