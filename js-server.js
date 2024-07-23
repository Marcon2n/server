let express = require("express");
let app = express();
let port = 9000;
const cors = require("cors");
const { uid } = require("uid");

const checkISOTime = (str) => {
    if (!/(\d{4}-\d{2}-\d{2})[A-Z]+(\d{2}:\d{2}:\d{2}).([0-9+-:]+)/.test(str)) {
        return false;
    }
    return true;
};

const userList = [
    {
        id: uid(),
        username: "admin",
        password: "123456",
        todo: [
            {
                id: uid(),
                label: "Công việc 1",
                time: "2024-07-23T04:11:16.954+07:00",
                content: "Content 1",
            },
        ],
    },
];

let token = "";

app.listen(port);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.post("/login", function (req, res) {
    const userIndex = userList.findIndex(
        (item) => item.username === req.body.username
    );

    if (userIndex === -1) {
        res.status(400).send(JSON.stringify({ message: "Invalid User" }));
    } else if (userList[userIndex].password !== req.body.password) {
        res.status(400).send(JSON.stringify({ message: "Invalid Password" }));
    } else {
        token = userList[userIndex].id;
        res.send(JSON.stringify({ token: userList[userIndex].id }));
    }
});

app.post("/create-user", function (req, res) {
    const userIndex = userList.findIndex(
        (item) => item.username === req.body.username
    );

    if (userIndex !== -1) {
        res.status(400).send(
            JSON.stringify({ message: "Username Unavailable" })
        );
    } else {
        userList.push({
            username: req.body.username,
            password: req.body.password,
            todo: [],
            id: uid(),
        });
        res.send(JSON.stringify({ message: "OK" }));
    }
});

app.get("/logout", function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    token = "";
    res.send(JSON.stringify({ message: "OK" }));
});

app.get("/get-todo", function (req, res) {
    const index = userList.findIndex((item) => item.id === token);
    res.send(JSON.stringify(userList[index].todo));
});

app.post("/create-todo", function (req, res) {
    const index = userList.findIndex((item) => item.id === token);
    if (
        req.body.time === undefined ||
        req.body.label === undefined ||
        req.body.content === undefined
    ) {
        res.status(400).send(JSON.stringify("error payload"));
    } else if (!checkISOTime(req.body.time)) {
        res.status(400).send(JSON.stringify("Time ISO-8601 format wrong"));
    } else if (req.body.id === undefined) {
        userList[index].todo.push({
            id: uid(),
            label: req.body.label,
            time: req.body.time,
            content: req.body.content,
        });
        res.send(JSON.stringify(userList[index].todo));
    } else {
        const indexTodo = userList[index].todo.findIndex(
            (item) => item.id === req.body.id
        );
        if (indexTodo === -1) {
            res.status(400).send(JSON.stringify("ID invalid"));
        } else {
            userList[index].todo.splice(indexTodo, {
                id: req.body.id,
                label: req.body.label,
                time: req.body.time,
                content: req.body.content,
            });
            res.send(JSON.stringify(userList[index].todo));
        }
    }
});

app.get("/delete-todo", function (req, res) {
    const index = userList.findIndex((item) => item.id === token);
    const indexTodo = userList[index].todo.findIndex(
        (item) => item.id === req.query.id
    );
    userList[index].todo.splice(indexTodo, 1);
    res.send(JSON.stringify({ message: "OK" }));
});
