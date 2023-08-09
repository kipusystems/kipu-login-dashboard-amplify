import UserSignin from '../authenticator/UserSignin'
import Logo from '../assets/images/Logo-Kipu-Health.svg'

function Signin() {
  return (
    <div className="tw-px-4 xl:tw-px-10 xl:tw-w-1/2">
      <img src={Logo} alt="Kipu-logo" className="tw-w-1/2 tw-mx-auto"/>
      <div className="tw-py-6">
        <h1>Staff Sign In Here and Accept Terms of Service</h1>
      </div>
      <UserSignin />
      <div className="tw-w-11/12 md:tw-w-3/4 tw-mx-auto tw-py-6">
        <p className="tw-text-justify">
          By clicking "Sign In Now and Accept our Terms of Service," you indicate that you have read and agree to be bound to the latest Kipu Systems Terms of Service.
        </p>
      </div>
      <div className="tw-w-11/12 lg:tw-w-3/4 tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-3">
        <div className=""><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://kipuhealth.com/terms-of-use/">Terms of Use MD</a></div>
        <div><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://kipuhealth.com/terms-of-service/">Terms and Conditions</a></div>
        <div><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://www.kipu.health/contact-kipu-health/">Customer Support</a></div>
        <div><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://kipuhealth.com/kipu-business-associate-agreement/">BAA</a></div>
        <div><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://kipuhealth.com/emr-training-calendar/">Training Calendar</a></div>
        <div><a className="tw-text-sm tw-underline tw-text-k-true-blue" href="https://t-core-master.kipuworks.com/users/unlock/new">Didn't receive unlock instructions?</a></div>
      </div>
    </div>
  )
}

export default Signin;