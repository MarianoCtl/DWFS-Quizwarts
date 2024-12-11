import React from 'react'

const CartItems = ({ cartItems, onAumentarCantidad, onDisminuirCantidad, onEliminarArticulo }) => {
    return (
        <div>
            <ul className="list-group list-group-flush positions-scroll container-panel rounded-1">
                <li className="list-group-item d-flex align-items-center text-golden b-input">
                    <div className="d-flex align-items-center w-100">
                        <div className="d-flex flex-column ms-2 w-25 fw-bold">Artículo</div>
                        <div className="d-flex flex-column ms-2 w-25 fw-bold d-none d-md-inline">Precio unitario</div>
                        <div className="d-flex flex-column ms-2 w-25 fw-bold">Cantidad</div>
                        <div className="d-flex flex-column ms-2 w-25 fw-bold text-end">Precio final</div>
                    </div>
                </li>
                {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex align-items-center text-golden b-input shadow">
                        <div className="d-flex align-items-center w-100">
                            <div className="d-flex flex-column ms-2 w-25">{item.articulo.nombre}</div>
                            <div className="d-flex flex-column ms-2 w-25 d-none d-md-inline">{item.costo}</div>
                            <div className="d-flex flex-column ms-2 w-25">
                                <div className='d-flex'>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => onDisminuirCantidad(item.id)}
                                        disabled={item.cantidad === 1}
                                    >
                                        -
                                    </button>
                                    {item.cantidad}
                                    <button className="btn btn-success btn-sm ms-2" onClick={() => onAumentarCantidad(item.id)}>+</button>
                                </div>
                            </div>
                            <div className="d-flex flex-column ms-2 w-25">
                                <div className='d-flex align-items-center justify-content-end'>
                                    <span>{item.costo * item.cantidad}</span>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => onEliminarArticulo(item.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default CartItems