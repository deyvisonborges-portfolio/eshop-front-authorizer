import { Step, Stepper } from "@/@lib-ui/src/core-components/stepper"

export default function CheckoutAppPage() {
  return (
    <Stepper>
      <Step title="Primeira etapa">
        <div className="space-y-4">
          <p>Please fill in your personal information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your last name"
              />
            </div>
          </div>
        </div>
      </Step>
      <Step title="Primeira etapa">
        <p>Segunda etapa</p>
      </Step>
    </Stepper>
  )
}
