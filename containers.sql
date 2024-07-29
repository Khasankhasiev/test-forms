-- Создание таблицы Containers
CREATE TABLE Containers (
    ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Number INT NOT NULL,
    Type NVARCHAR(255) NOT NULL,
    Length FLOAT NOT NULL,
    Width FLOAT NOT NULL,
    Height FLOAT NOT NULL,
    Weight FLOAT NOT NULL,
    IsEmpty BIT NOT NULL,
    ArrivalDate DATETIME NOT NULL
);

-- Создание таблицы Operations
CREATE TABLE Operations (
    ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ContainerID UNIQUEIDENTIFIER NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    OperationType NVARCHAR(255) NOT NULL,
    OperatorName NVARCHAR(255) NOT NULL,
    InspectionLocation NVARCHAR(255) NOT NULL,
    FOREIGN KEY (ContainerID) REFERENCES Containers(ID)
);

-- Запрос на получение данных из таблицы Containers в формате JSON без встроенной функции
SELECT
    '{' +
    '"ID": "' + CAST(ID AS NVARCHAR(36)) + '",' +
    '"Number": ' + CAST(Number AS NVARCHAR(255)) + ',' +
    '"Type": "' + Type + '",' +
    '"Length": ' + CAST(Length AS NVARCHAR(255)) + ',' +
    '"Width": ' + CAST(Width AS NVARCHAR(255)) + ',' +
    '"Height": ' + CAST(Height AS NVARCHAR(255)) + ',' +
    '"Weight": ' + CAST(Weight AS NVARCHAR(255)) + ',' +
    '"IsEmpty": ' + CAST(IsEmpty AS NVARCHAR(255)) + ',' +
    '"ArrivalDate": "' + CONVERT(NVARCHAR, ArrivalDate, 126) + '"' +
    '}' AS JSONData
FROM Containers;

-- Запрос на получение данных из таблицы Operations для определенного контейнера в формате JSON без встроенной функции
DECLARE @ContainerID UNIQUEIDENTIFIER = '123e4567-e89b-12d3-a456-426614174000';

SELECT
    '{' +
    '"ID": "' + CAST(ID AS NVARCHAR(36)) + '",' +
    '"ContainerID": "' + CAST(ContainerID AS NVARCHAR(36)) + '",' +
    '"StartDate": "' + CONVERT(NVARCHAR, StartDate, 126) + '",' +
    '"EndDate": "' + CONVERT(NVARCHAR, EndDate, 126) + '",' +
    '"OperationType": "' + OperationType + '",' +
    '"OperatorName": "' + OperatorName + '",' +
    '"InspectionLocation": "' + InspectionLocation + '"' +
    '}'
FROM Operations
WHERE ContainerID = @ContainerID;
