function AuthForm({
  register, errors, watch, onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="author">
      <div className="sign">
        <div className="title">
          <h3>Sign Up</h3>
        </div>
        <input
          {...register('username', {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          placeholder="Username"
        />
        {errors.username && (
          <span>Name must be between 3 and 20 characters</span>
        )}

        <input
          {...register('email', {
            required: true,
            pattern: /^[^@]+@[^@]+\.[^@]+$/,
          })}
          placeholder="Email address"
        />
        {errors.email && <span>Invalid email</span>}

        <input
          type="password"
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
          placeholder="Password"
        />
        {errors.password && <span>Password must be 6–40 characters</span>}

        <input
          type="password"
          {...register('confirmPassword', {
            validate: (value) => value === watch('password'),
          })}
          placeholder="Repeat Password"
        />
        {errors.confirmPassword && <span>Passwords do not match</span>}

        <label className="checkbox">
          <input
            type="checkbox"
            {...register('agreement', { required: true })}
          />
          {' '}
          Consent is required
        </label>
        {errors.agreement && <span>Consent is required</span>}

        <button type="submit" className="btn-sign">Sign Up</button>
      </div>
    </form>
  );
}

export default AuthForm;
