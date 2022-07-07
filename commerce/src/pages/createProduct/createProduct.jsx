import React from 'react';
import './createProduct.css'
import Dropzone from 'react-dropzone'
const CreateProduct = () => {
    function handleOnDrop  (files) {
        console.log(files)
    }

    return (
        <div className="contain-page-create-product">
            <div className="form-cart">
                <form className='form'>
                    <div className="mb-3">
                        <label for="InputTitle" className="form-label">Titulo</label>
                        <input type="text" className="form-control" id="InputTitle" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <br />
                    <div className="mb-3">
                        <label for="InputDescription" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="InputDescription" />
                    </div>
                    <br />       
                    <div className="mb-3">
                        <label for="InputPrice" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="InputPrice" />
                    </div>
                    <br />
                    <div className="mb-3">
                        {/* <label for="InputPrice" className="form-label">Precio</label> */}
                        <Dropzone onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section >
                                    <div className='border rounded border-secondary text-center p-3' {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                    </section>
                                )}
                        </Dropzone>
                    </div>
                    <br />
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <br />
                    <>
                    
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                    </div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                        <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
                    </div>

                    </>
                    <br />
                    <div className="mb-3">
                        <label for="InputPQuantity" className="form-label">Cantidad</label>
                        <input type="number" className="form-control" id="InputQuantity" />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateProduct