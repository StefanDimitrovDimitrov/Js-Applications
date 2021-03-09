function asyncDemo(){
    console.log('First');

    setTimeout(()=>{
        console.log('inside timeout');
    }, 2000)

    console.log('Second');
}

asyncDemo();