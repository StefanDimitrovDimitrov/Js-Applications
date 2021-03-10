let object1 ={
    'id': 10,
    'fname': 'Stefan',
    'lname':'Dimitrov'
}

let object2 ={
    'id': 11,
    'fname': 'Ivan',
    'lname':'Dimitrov'
}

let object3 ={
    'id': 12,
    'fname': 'Slavena',
    'lname':'Dimitrov'
}

const list =[object1, object2, object3]

let newList = list.reduce((acc, c) =>{
    acc[c.id] = c
    return acc
},{})


console.log(list);
console.log(newList)