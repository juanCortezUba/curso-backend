function pepe(callback) {
  // todo de la db es async
  try {
    //abre bd

    console.log("abre bd");

    //establece conect
    console.log("establece conect");

    // lee datos
    console.log("lee  datos");
   
    callback(null, { user: "pepe" });
  } catch (error) {
    callback(error, null );
  }
}



pepe((err,resOk)=>{
    if( err) return console.log(err);
    console.log(resOk)
});
