import mongoose from 'mongoose'

// Un enum son valores conocidos posibles
export const statusEnum = ["AVAILABLE", "NOT AVAIABLE", "DISCONTINUED"]

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        //Si el cliente ni me envia el dat, le respondemos
        // con este msj
        require: [true, "Name field is required"],
        minLength: 3,
        maxLength: 50,
        unique: true,
        lowercase: true,
        trim: true
    },
    price: {
        type: Number,
        require: [true, "Price field is required"],
        min:[1, "Price field has to be a number"]
    },
    //Generamos un valor de ganacnia, en este caso le sacamos el 30%
    //  del valor de lista(valor de lista, es el valor que cuesta el producto.)
    profitRate: {
        type: Number,
        default: 1.30,
        min: [1, " Profitrate must be greater that or equal to 1"]
    },
    description: {
        type: String,
        minLength: 5,
        maxLength:  200,
    },
    // El status lo manejamos con un enum de posibles valores
    status: {
        type: String,
            //validate sirve para generar una funcion de 
            // validacion para nuestros campos
            validate: {
                validator: function (status){
                    //validator contiene una funcion que permite
                    //  validaralgo del campo
                    //status es
                    return statusEnum.includes(status)
                },
                //props es el dato que nos llego en status
                message: props => `${props.value} it's not a 
                valid status`
        }
    },
    //seria el equivalente a FK en base de datos sql
    //ref es a que modelo pertenece el producto
    //Esto hace referencia al objectId de la categoria a la que pertenece el producto
    // si te fijas en mongo aparece cada category con un objectId que obviamente es unico
    category: { type: mongoose.Schema.Types.ObjectId,
         ref:"category"
    },

    stock: {
        type: Number,
        default: 0,
        min: [0, "Stock can't be a negative number"]
    },

    // Campo de destacados
    Highlighted: {
        type: Boolean,
        default: false,

    },
})
    // Metodos de instancia para disminuir el stock
    //amount es la cantidad a vender que se resta al stock
    productSchema.methods.decreaseStock = async function (amount){
        if(amount <= 0 ){
            throw new Error("Amount has to be a positive value")
        }
        if(this.stock < amount){
            throw new Error("Not enough quantity")
        }
        // Stock = stock - amount
        this.stock -= amount
        // Se guarda en la db el nuevo valor 
        await this.save()
    }

    // Atributos/propiedades virtuales sirven para calcular
    // el precio con la tasa de ganancia
    // Permite generar un valor sin haberlo escrito en el esqueda
    // facilita mucho que pudamos hacer calculos con nuestro propios valores
    // sin escribirlos como tal
    // NO se ejecuta automaticamente, entonces lo incluimos donde necesitamos
    // restar stock
    //datos pre calculados, no es que lo escribas como tal, toma un valor de un precio
    //que si decalras, y toma ese precio y le suma un porcentaje  
    productSchema.virtual("priceWithProfitRate").get(function(){
        return this.price * this.profitRate
    })

    //Es una configuracion para incluir las propiedades virtuales
    productSchema.set("toJSON", {virtuals: true})
    productSchema.set("toObject", {virtuals: true})


export default mongoose.model("product", productSchema)
