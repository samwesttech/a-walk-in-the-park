export const formatDOB = (DOB) => {
    
    const splitDOB = DOB.split("/")
    const date = splitDOB.shift()
    splitDOB.splice(1, 0, date)
    return splitDOB.join("/")
}

export const calculateAge = (DOB) => {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

export const formatDOBFromSignUp = (DOB) => {
    const splitDOB = DOB.split("-")
    const day = splitDOB.pop()
    const year = splitDOB.shift()
    splitDOB.splice(0, 0, day)
    splitDOB.splice(2, 0, year)

    const newDate = splitDOB.join("/")
    return newDate
}


