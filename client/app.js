document.getElementById("file").addEventListener("change",ev=>{
    ev.preventDefault()
    const formdata=new FormData()
    formdata.append("image",ev.target.files[0])
    fetch("http://localhost:3000/upolads",{
        method:"POST",
        body:formdata
    }).then(data=>data.json())
    .then(data=>console.log(data))
})