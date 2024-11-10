for file in .data/uploads/*.mysql.sql; do
    mariadb -h localhost -P 3306 --password=example --user=root naba < "$file"
done