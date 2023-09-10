-- every user has 'password' as a password
INSERT INTO
    _user (email, firstname, lastname, password, role)
VALUES
    (
        'rafal.teacher@teacher.com',
        'Rafał',
        'teacher',
        '$2a$10$RQKsiiViCvNo30TvOc/A5uZZxhE4KDjNfxNpn.JCCjFbC2KR5SKru',
        'TEACHER'
    ),
    (
        'jan.student@student.com',
        'Jan',
        'student',
        '$2a$10$RQKsiiViCvNo30TvOc/A5uZZxhE4KDjNfxNpn.JCCjFbC2KR5SKru',
        'STUDENT'
    ),
INSERT INTO
    course (code, name, description, coordinator_id)
VALUES
    (
        'APSI',
        'Analiza i projektowanie systemów informacyjnych',
        'W ramach wykładu omawiane są zagadnienia dotyczące cyklu życia projektu informatycznego realizacji projektu informatycznego oraz jego realizacji w oparciu o różne metodyki: tradycyjne i zwinne.',
        (
            SELECT
                id
            FROM
                _user
            WHERE
                email = 'rafal.teacher@teacher.com'
        )
    ),
INSERT INTO
    enrollment (course_code, student_id)
VALUES
    (
        'APSI',
        (
            SELECT
                id
            FROM
                _user
            WHERE
                email = 'jan.student@student.com'
        )
    ),
INSERT INTO
    gradescale (
        percentage30,
        percentage35,
        percentage40,
        percentage45,
        percentage50
    )
VALUES
    (50, 60, 70, 80, 90),
    (50, 60, 70, 80, 90),
    (50, 60, 70, 80, 90);

INSERT INTO
    examtemplate (
        title,
        description,
        date_time_start,
        date_time_end,
        duration,
        course_code,
        gradescale_id
    )
VALUES
    (
        'Kolokwium 1',
        'Pierwsze kolokwium z przedmiotu APSI',
        timestamp '2023-06-20 10:00:00.000',
        timestamp '2023-06-20 12:00:00.000',
        90,
        'APSI',
        1
    ),
    (
        'Kolokwium 2',
        'Drugie kolokwium z przedmiotu APSI',
        timestamp '2023-06-22 14:00:00.000',
        timestamp '2023-06-22 15:00:00.000',
        45,
        'APSI',
        2
    ),
    (
        'Egzamin z plikiem',
        'Egzamin testowy z plikiem',
        timestamp '2023-06-24 15:30:00.000',
        timestamp '2023-06-24 16:30:00.000',
        60,
        'APSI',
        3
    );

INSERT INTO
    taskpool (
        title,
        description,
        task_type,
        points_per_task,
        min_points_per_task,
        task_draw_number,
        exam_id
    )
VALUES
    (
        'Pula 1',
        'Pula zadań zamkniętych',
        'CLOSED',
        2.0,
        0.0,
        3,
        (
            SELECT
                id
            FROM
                examtemplate
            WHERE
                title = 'Kolokwium 1'
        )
    ),
    (
        'Pula 2',
        'Pula zadań otwartych',
        'OPEN',
        4.5,
        0.0,
        2,
        (
            SELECT
                id
            FROM
                examtemplate
            WHERE
                title = 'Kolokwium 1'
        )
    ),
    (
        'Pula z plikiem',
        'Pula zadań z plikiem',
        'FILE',
        5.0,
        0.0,
        1,
        (
            SELECT
                id
            FROM
                examtemplate
            WHERE
                title = 'Egzamin z plikiem'
        )
    );

INSERT INTO
    _task (type, title, content, penalty_weight, pool)
VALUES
    (
        'OPEN',
        'Stonoga',
        'Ile nóg ma stonoga?',
        NULL,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 2'
        )
    ),
    (
        'OPEN',
        'Lodówka',
        'Dlaczego światło w lodówce jest, a już w zamrażalniku nie ma?',
        NULL,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 2'
        )
    ),
    (
        'OPEN',
        'Piernik',
        'Co ma piernik do wiatraka?',
        NULL,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 2'
        )
    ),
    (
        'OPEN',
        'Pragnienie ryb',
        'Czy ryby odczuwają pragnienie?',
        NULL,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 2'
        )
    ),
    (
        'OPEN',
        'Pizza',
        'Dlaczego skoro pizza jest okrągła, to pakowana jest w kwadratowe pudełka?',
        NULL,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 2'
        )
    ),
    (
        'CLOSED',
        'Krzywousty',
        'Jak nazywał się brat Bolesława Krzywoustego?',
        1,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 1'
        )
    ),
    (
        'CLOSED',
        'Michael Jordan',
        'Michael Jordan zdobył tytuły mistrza NBA z drużyną:',
        1,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 1'
        )
    ),
    (
        'CLOSED',
        'Tron we krwi',
        '"Tron we krwi" to jeden z najważniejszych filmów wyprodukowanych:',
        1,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 1'
        )
    ),
    (
        'CLOSED',
        'Roman Polański',
        'Którego z tych filmów nie reżyserował Roman Polański?',
        1,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 1'
        )
    ),
    (
        'CLOSED',
        'Chinkali',
        'Tradycyjne gruzińskie chinkali wypełnione są:',
        1,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula 1'
        )
    );

INSERT INTO
    _task (type, title, content, format, maximum_size, pool)
VALUES
    (
        'FILE',
        'Plik',
        'Wgraj plik typu txt',
        'txt',
        5,
        (
            SELECT
                id
            FROM
                taskpool
            WHERE
                title = 'Pula z plikiem'
        )
    );

INSERT INTO
    answer (content, weight, is_correct, closedtask_id)
VALUES
    (
        'Mieszko',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Krzywousty'
        )
    ),
    (
        'Jarosław',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Krzywousty'
        )
    ),
    (
        'Zbigniew',
        1,
        true,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Krzywousty'
        )
    ),
    (
        'Chicago Bulls',
        1,
        true,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Michael Jordan'
        )
    ),
    (
        'Houston Rockets',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Michael Jordan'
        )
    ),
    (
        'Boston Celtics',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Michael Jordan'
        )
    ),
    (
        'we Włoszech',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Tron we krwi'
        )
    ),
    (
        'w Japonii',
        1,
        true,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Tron we krwi'
        )
    ),
    (
        'w Niemczech',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Tron we krwi'
        )
    ),
    (
        '"Autor widmo"',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Roman Polański'
        )
    ),
    (
        '"Gorzkie gody"',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Roman Polański'
        )
    ),
    (
        '"Omen"',
        1,
        true,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Roman Polański'
        )
    ),
    (
        'kozim serem',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Chinkali'
        )
    ),
    (
        'pieczarkami',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Chinkali'
        )
    ),
    (
        'mięsem',
        1,
        true,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Chinkali'
        )
    ),
    (
        'owczym serem',
        1,
        false,
        (
            SELECT
                id
            FROM
                _task
            WHERE
                title = 'Chinkali'
        )
    );