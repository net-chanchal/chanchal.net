# Routine API Document

### Student Signup

__PHP API Script File:__ [student-signup.php](student-signup.php)

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "data": [
    {"departments": []},
    {"sections": []},
    {"semesters": []},
    {"shifts": []}
  ]
}
```

__Error Response:__

```json
{
  "status": "INVALID",
  "message": "PHP PDOException Message"
}
```

### Teacher Signup

__PHP API Script File:__ [teacher-signup.php](teacher-signup.php)

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "data": [
    {"semesters": []},
    {"teachers": []}
  ]
}
```

__Error Response:__

```json
{
  "status": "INVALID",
  "message": "PHP PDOException Message"
}
```

### Student Routine

__PHP API Script File:__ [student-routine.php](student-routine.php)

__Request Method: GET__

_Input parameters and each field is required_

```json
{
  "department_id": "integer",
  "section_id": "integer",
  "semester_id": "integer",
  "shift_name": "string [1st Shift | 2nd Shift | Evening Shift]"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "query": {
    "department_id": "integer",
    "section_id": "integer",
    "semester_id": "integer",
    "shift_name": "string [1st Shift | 2nd Shift | Evening Shift]"
  },
  "data": []
}
```

__Error Response:__

```json
{
  "status": "INVALID",
  "message": "PHP PDOException Message"
}
```

### Student Routine Filter

__PHP API Script File:__ [student-routine-filter.php](student-routine-filter.php)

__Request Method: GET__

_Input parameters and each field is required_

```json
{
  "semester_id": "integer",
  "teacher_id": "integer"
}
```

_Input parameters and each field is optionals_

```json
{
  "course_id": "integer",
  "day": "string",
  "time_id": "string",
  "room_id": "string",
  "teacher_id": "integer"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "query": {
    "semester_id": "integer",
    "teacher_id": "integer"
  },
  "data": {
    "courses": [],
    "days": [],
    "times": [],
    "rooms": [],
    "teachers": []
  }
}
```

__Error Response:__

```json
{
  "status": "FAILED",
  "message": "PHP PDOException Message"
}
```

### Teacher Routine

__PHP API Script File:__ [teacher-routine.php](teacher-routine.php)

__Request Method: GET__

_Input parameters and each field is required_

```json
{
  "semester_id": "integer",
  "teacher_id": "integer"
}
```

_Input parameters and each field is optionals_

```json
{
  "course_id": "integer",
  "day": "string",
  "time_id": "string",
  "room_id": "string"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "query": {
    "semester_id": "integer",
    "teacher_id": "integer"
  },
  "data": []
}
```

__Error Response:__

```json
{
  "status": "INVALID",
  "message": "PHP PDOException Message"
}
```


### Teacher Routine Filter

__PHP API Script File:__ [teacher-routine-filter.php](teacher-routine-filter.php)

__Request Method: GET__

_Input parameters and each field is required_

```json
{
  "semester_id": "integer",
  "teacher_id": "integer"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Query success!",
  "query": {
    "department_id": "integer",
    "section_id": "integer",
    "semester_id": "integer",
    "shift_name": "string [1st Shift | 2nd Shift | Evening Shift]"
  },
  "data": {
    "courses": [],
    "days": [],
    "times": [],
    "rooms": [],
    "teachers": []
  }
}
```

__Error Response:__

```json
{
  "status": "FAILED",
  "message": "PHP PDOException Message"
}
```


### Student Profile

__PHP API Script File:__ [student-profile.php](student-profile.php)

__Request Method: POST__

_Input parameters and each field is required_

```json
{
  "department_id": "integer",
  "section_id": "integer",
  "semester_id": "integer",
  "student_id": "string",
  "student_name": "string",
  "student_email": "string",
  "shift_name": "string[1st Shift|2nd Shift|Evening Shift]"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Data inserted successfully"
}
```

__Error Response:__

```json
{
  "status": "FAILED",
  "message": "PHP PDOException Message"
}
```


### Visitor

__PHP API Script File:__ [visitor.php](visitor.php)

__Request Method: POST__

_Input parameters and each field is required_

```json
{
  "uuid": "string",
  "name": "string",
  "ip": "string",
  "data": "json"
}
```

__Success Response:__

```json
{
  "status": "SUCCESS",
  "message": "Data inserted successfully"
}
```

__Error Response:__

```json
{
  "status": "FAILED",
  "message": "PHP PDOException Message"
}
```
