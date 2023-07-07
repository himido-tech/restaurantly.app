'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import NewSection from '../../components/menu/AddSection';

type Inputs = {
  category: string,
  description: string,
};

export default function Menu() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main>
      <NewSection />
      <h1>Menu</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-grid gap-2">
          <label>Category</label>
          {/* register your input into the hook by invoking the "register" function */}
          <input className="w-50" placeholder="For example: Main" {...register("category")} />
          <label>Description</label>
          {/* include validation with required or other standard HTML validation rules */}
          <textarea {...register("description", { required: false })} placeholder="For example: 
          Choose from top-rated comfort food, healthy, and vegetarian options. Find your meal now!" />
          {/* errors will return when field validation fails  */}
          {errors.category && <span>This field is required</span>}

          <button type="submit" className="btn btn-primary">Add a section</button>
        </div>
      </form>
    </main >
  );
}