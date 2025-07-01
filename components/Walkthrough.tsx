import Link from "next/link"
import { Plus, Minus } from "lucide-react"
export default function Walkthrough() {
    return (
        <>
            <h2 className="text-gray-800 dark:text-gray-300 text-xl">to get started</h2>
            <p>besides the <Link href="/" className="text-blue-400">landing page</Link>, there are two main pages: <Link href="/new">create new session</Link> & edit session (which you <span className="inline font-bold text-red-500">can&apos;t</span> get access to before having a session code).</p>
            <p>you are currently on the <Link href="/new" className="text-blue-400">create session page</Link>. after you create a session, you can click on the &ldquo;share my session&rdquo; button below to get your session code on a pop-up. Your session code should be in the format of alphanumerical digits of length 8.</p>
            <p>after you get your session code, you can copy paste the session code to your friends. after they enter the session code in the input box on the landing page and press enter, they will be redirected to the edit page of your customized session to enter their information.</p>
            <h2 className="text-gray-800 dark:text-gray-300 text-xl">how to design a customized session?</h2>
            <p>after people enter the session code and get access to the session, they will see default basic entries including `name`, `age`, `contact`, `role`, and `location`; if you enter any customized fields on this create new session page, they will also be able to see the entries under the default entries.</p>
            <p>people may have different demands over what other entries they would like to add:</p>
            <p className="text-gray-500 italic text-center">i.e. for high school seniors that are about to graduate, they may want to add their `committed college` as one customized field. </p>
            <p>you are allowed to control in which type should the answers be to avoid unhinged answers, for example, if you want others to enter their birthday, make them in the same format by selecting the `Date` type in the dropdown menu. click the <Plus className="inline size-4 relative bottom-0.5"/> button to confirm adding the field, and click the <Minus className="inline size-4 relative bottom-0.5 text-white bg-red-500 text-center rounded-full"/> to delete customized fields that you don&apos;t want to add anymore.</p>
            <p>&ldquo;templates&rdquo; have been added as a way to quickly get access to some of the entries assumed to be used, and you can select them in the dropdown menu to see if any of which fits your need. it is also a good way to get a sense of what customized entries <span className="inline italic">you</span> want to implement!</p>
        </>
    )
}