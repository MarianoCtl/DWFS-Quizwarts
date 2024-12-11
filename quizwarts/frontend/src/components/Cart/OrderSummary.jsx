import React from 'react'

function OrderSummary({ total, saldo, cartItems, onFinalizarCompra }) {
    const saldoDespuesCompra = saldo - total;
    const saldoSuficiente = saldoDespuesCompra >= 0;

    return (
        <div className='container-panel'>
            {cartItems.length > 0 && (
                <div className='card p-2 b-input shadow'>
                    <h5 className='text-golden mt-3'>TOTAL: ${total}</h5>
                    <h5 className='text-golden'>Saldo disponible: ${saldo}</h5>
                    <h6 className='text-golden mt-3 fst-italic'>
                        Saldo después de la compra: {saldoSuficiente ? `$${saldoDespuesCompra}` : 'Saldo insuficiente'}
                    </h6>
                    <div className='d-flex justify-content-center mt-2'>
                        <button className='btn btn-lilac text-white' disabled={!saldoSuficiente} onClick={onFinalizarCompra}>
                            Finalizar compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderSummary