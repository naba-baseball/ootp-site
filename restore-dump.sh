#! /usr/bin/bash
mariadb -h localhost -P 3306 --password=example --user=root naba < .data/uploads/*.mysql.sql