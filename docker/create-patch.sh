#!/usr/bin/env bash
set -e

THIS_DIR="$(dirname $0)"
cd "$THIS_DIR"

(cd .tomcat && diff --new-file '--exclude=tomcat-users.xml' '--exclude=ext' '--exclude=work' '--exclude=logs' '--exclude=webapps' -ru ../.tomcat-original/ ./ > ../contrib/tomcat.patch || true)

# (cd contrib/original && find . -type f -print0  | xargs -0 shasum > ../tomcat.sha1)