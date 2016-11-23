# AuctionBot
This bot can hold auction among telegram users

IP = 146.185.180.98
PORT = 8888
Content-Encode = JSON
Передача данных в параметре 'q' адресной строки: q=...

# Пример запроса:
POST / HTTP/1.1
Host: http://146.185.180.98:8888
Content-Type: application/json; charset=utf-8
Content-Length: 53

q=%7B%22method%22%3A%22showLots%22%2C%22id%22%3A1%7D

# Ответ сервера:
HTTP/1.1 200 OK
Content-Type: text/plain
Cache-Control: no-cache
Date: Sun, 20 Nov 2016 23:15:59 GMT
Connection: keep-alive
Transfer-Encoding: chunked

1a1
text=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%92%D0%B0%D1%88%D0%B8%D1%85%20%D0%BB%D0%BE%D1%82%D0%BE%D0%B2%20%D0%BD%D0%B0%20%D0%BD%D0%B0%D1%81%D1%82%D0%BE%D1%8F%D1%89%D0%B8%D0%B9%20%D0%BC%D0%BE%D0%BC%D0%B5%D0%BD%D1%82%3A%0Aa%20(%D0%A2%D0%BE%D1%80%D0%B3%D0%B8%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D1%87%D0%B5%D0%BD%D1%8B)%0A1b%20(%D0%A2%D0%BE%D1%80%D0%B3%D0%B8%20%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D1%87%D0%B5%D0%BD%D1%8B)%0A
0

# Удалённое подключение по SSH:
ssh -l root 146.185.180.98
password: Qwerty!!!#

# Пользователь баз данных:
login: postgres
password: qwerty
