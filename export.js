// const account = 12345;

// module.exports = account

window.iamGlobal = "some val";

function doSomething()
{
    iamGlobal = account;

    // console.log(iamGlobal);
}

doSomething();

console.log(iamGlobal);


