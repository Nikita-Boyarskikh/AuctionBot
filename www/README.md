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

Список Ваших лотов на настоящий момент:\na (Торги ещё не начались)\nb (Идут торги)\тс (Торги закончены)

# Удалённое подключение по SSH:
ssh -l root 146.185.180.98 8888
password: Qwerty!!!#

# Пользователь баз данных:
login: postgres
password: qwerty
