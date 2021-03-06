import asyncHandler from 'express-async-handler'
import Presupuesto from '../models/presupuestoModel.js'


export const getPresupuestos = asyncHandler(async (req, res) => {

  const pageSize = Number(req.query.pageSize)
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        refid: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  if (req.user.isAdmin)
  {
    if (pageSize > 0)
    {
      const count = await Presupuesto.countDocuments({...keyword})
      const presupuestos = await Presupuesto.find({...keyword})
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .populate('products')
          .populate('store')
      res.json({presupuestos, page, pages: Math.ceil(count / pageSize)})
    }
    else
    {
      const presupuestos = await Presupuesto.find({...keyword})
      res.json({presupuestos, page, pages: 1})
    }
  }
  else
  {
    if (pageSize > 0)
    {
      const count = await Presupuesto.countDocuments({...keyword, store: req.user._id})
      const presupuestos = await Presupuesto.find({...keyword, store: req.user._id})
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .populate('products')
      res.json({presupuestos, page, pages: Math.ceil(count / pageSize)})
    }
    else
    {
      const presupuestos = await Presupuesto.find({...keyword, store: req.user._id})
      res.json({presupuestos, page, pages: 1})
    }
  }
})


export const getOnePresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = await Presupuesto.findOne({ _id: req.params.id})
                                       .populate('items.product')
                                       .populate('store')
  if (presupuesto)
  {
    res.json(presupuesto)
  }
  else
  {
    res.status(404).json({msg: 'not found'})
  }
})


export const createPresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = new Presupuesto(req.body)

  try {
    const createdPresupuesto = await presupuesto.save()
    res.status(201).json(createdPresupuesto)
  } catch (error) {
    res.status(400)
    console.error(error)
    throw new Error('Bad request')
  }
})

export const updatePresupuesto = asyncHandler(async (req, res) => {

  let presupuesto = await Presupuesto.findById(req.params.id)
  console.log(req.body)
  if (presupuesto) {
    const {
      cliente,
      store,
      items,
      state,
      valido_hasta,
      total
    } = req.body
    presupuesto.cliente = cliente
    presupuesto.store = store
    presupuesto.items = items
    presupuesto.state = state
    presupuesto.valido_hasta = valido_hasta
    presupuesto.total = total

    /* res.json(presupuesto) */
    const updatedP = await presupuesto.save() 
    res.json(updatedP)
  } else {
    res.status(404)
    throw new Error('Presupuesto not found')
  }
})
 


export const deletePresupuesto = asyncHandler(async (req, res) => {
  const presupuesto = await Presupuesto.findById(req.params.id)
  if (presupuesto) {
    await presupuesto.remove()
    res.json({ message: 'presupuesto removed' })
  } else {
    res.status(404)
    throw new Error('presupuesto not found')
  }
})

