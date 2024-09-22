import user from '../modal/useModel.js'
import book from '../modal/books.js'
// import JWT, from 'jsonwebtoken'

export const bookController = async(req, res)=>{
    const {id} = req.headers;
    const users = await user.findById(id)
    if(users.role !== "admin"){
    return res.status(400).send({
        success:false,
        message:"you do not have access to perform admin work",
        
})};
try {
    const {url, title, author, price, desc, language} = req.body
        const books = await new book({
          url,
          title,
          author,
          price,
          desc,
          language
        }).save()
            res.status(201).send({
            success: true,
            message: "book add successfully",
            books
        })
} catch (error) {
    res.status(500).send({
            success:false,
           message:"error in update book",
           error
          })
}
};

export const updatebookcontroller = async(req, res)=>{
    const {id} = req.headers;
    const users = await user.findById(id)
    if(users.role !== "admin"){
    return res.status(400).send({
        success:false,
        message:"you do not have access to perform admin work",
        
})};
    try {
        const {url, title, author, price, desc, language}= req.body
        const {bookid} = req.headers;
        const books = await book.findByIdAndUpdate(bookid, {
            url,
            title,
            author,
            price,
            desc,
            language
        },{new:true})
         return  res.status(201).send({
            success: true,
            message: "book update successfully",
            books
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in update book",
            error
         })
    }
};

export const deletbookController =  async(req, res)=>{
    const {id} = req.headers;
    const users = await user.findById(id)
    if(users.role !== "admin"){
    return res.status(400).send({
        success:false,
        message:"you do not have access to perform admin work",
        
})};
    try {
        const {bookid} = req.headers
        const books = await book.findByIdAndDelete(bookid)
        res.status(200).send({
            success:true
        })
    } catch (error) {
            res.status(500).send({
                success:false
             })
    }
};

export const getallbookController = async(req, res)=>{
           try {
            const books = await book.find().sort({createdAt: -1})
            res.status(200).send({
                success:true,
                message:"books find successfully",
                books
            })
           } catch (error) {
            res.status(500).send({
                success:false,
                message:"error while find books"
             })
           }
}




export const getallrecbookController = async(req, res)=>{
           try {
            const books = await book.find().sort({createdAt: -1}).limit(4)
            res.status(200).send({
                success:true,
                message:"books find successfully",
                books
            })
           } catch (error) {
            res.status(500).send({
                success:false,
                message:"error while find books"
             })
           }
};



export const getsinglebookController = async(req, res)=>{
    try {
    const {id} = req.params
     const books = await book.findById(id)
     res.status(200).send({
         success:true,
         message:"books find successfully",
         books
     })
    } catch (error) {
     res.status(500).send({
         success:false,
         message:"error while find books"
      })
    }
}




