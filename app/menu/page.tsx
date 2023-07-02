'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string,
  exampleRequired: string,
};

export default function Menu() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main>
      <h1>Menu</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Category</label>
        <div className="form-group">
          {/* register your input into the hook by invoking the "register" function */}
          <input placeholder="For example: Main" {...register("example")} />
        </div>
        <label>Description</label>
        <div className="form-group">
          {/* include validation with required or other standard HTML validation rules */}
          <textarea className="w-100"{...register("exampleRequired", { required: true })} placeholder="For example: 
          Choose from top-rated comfort food, healthy, and vegetarian options. Find your meal now!" />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>
    </main>
  );
}