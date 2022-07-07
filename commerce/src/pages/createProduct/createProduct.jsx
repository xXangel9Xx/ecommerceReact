import React from 'react';
import './createProduct.css'
const CreateProduct = () => {
    return (
        <div className="contain-page-create-product">
            <div className="form-register">
                <form className='form'>
                    <div class="mb-3">
                        <label for="InputTitle" class="form-label">Titulo</label>
                        <input type="text" class="form-control" id="InputTitle" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="InputDescription" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="InputDescription" />
                    </div>

                    <div class="mb-3">
                        <label for="InputPrice" class="form-label">Precio</label>
                        <input type="number" class="form-control" id="InputPrice" />
                    </div>


                    <div class="fv-row">
                        <div class="dropzone" id="kt_dropzonejs_example_1">
                            <div class="dz-message needsclick">
                                <i class="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
                                <div class="ms-4">
                                    <h3 class="fs-5 fw-bolder text-gray-900 mb-1">Drop files here or click to upload.</h3>
                                    <span class="fs-7 fw-bold text-gray-400">Upload up to 10 files</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default CreateProduct