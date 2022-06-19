import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hook/useAuth';
import './CheckOut.css';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CheckOut = () => {
  const { user } = useAuth();
  const [allBookings, setAllBookings] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  useEffect(() => {
    fetch(`https://pacific-sea-24561.herokuapp.com/bookings/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setAllBookings(data));
  }, []);

  return (
    <Container className='my-5'>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Billing form */}
            <div className="col-12">
              <div className="row billing-form">
                <div className="col-sm-12 col-md-6">
                    <h2 className='mb-5'>Billing Deatils</h2>
                  <div className="mb-4">
                    <label htmlFor="">First name</label>
                    <br />
                    <input {...register('firstName')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Last name</label>
                    <br />
                    <input {...register('lastName')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Country / Region</label>
                    <br />
                    <input {...register('country')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Street address</label>
                    <br />
                    <input {...register('address')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Town / City</label>
                    <br />
                    <input {...register('town')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Postcode / Zip</label>
                    <br />
                    <input {...register('postcode')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Phone</label>
                    <br />
                    <input type="number" {...register('phone')} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="">Email address</label>
                    <br />
                    <input type="email" {...register('email')} required />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="col-sm-12 col-md-6">
                <h2 className='mb-5'>Additional Information</h2>
                  <div className="mb-4">
                    <label htmlFor="">Email address</label>
                    <br />
                    <input type="email" {...register('email')} required />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-5">
              <h3 className="mb-5">Your Order</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                {allBookings.map((bookings) => {
                  const {
                    _id,
                    name,
                    price,
                    room,
                    checkInDate,
                    checkOutDate,
                    adults,
                  } = bookings;
                  const subtotal = price * parseInt(room);
                  return (
                    <>
                      <tbody>
                        <tr>
                          <td>
                            <div key={_id} className="bookings my-3">
                              <div></div>
                              <div className="ms-3">
                                <p className="mb-4 room-name">
                                  {name} * {room.slice(0, 1)}
                                </p>
                                <p className="details">
                                  Reservation: {checkInDate}, {checkOutDate}
                                </p>
                                <p className="details">Guests: {adults} </p>
                              </div>
                            </div>
                          </td>
                          <td>$ {subtotal}</td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </Table>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CheckOut;
