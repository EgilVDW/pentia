/**
 * # Difficulties & Solutions
 *
 * Here we will go a little in depth about challenges we ran into and how we overcame them.
 *
 *
 * ## Firebase & Firestore:
 * The occuring problem with Firebase and Firestore was the lack of authentication.
 * During the process of the project, it was decided not to implement the build in auth system.
 * This was to save time with having to log in to test new features, which in the end was solved.
 *
 * However, this proved to give quite the headache in the long run when auth was later implemented in the project.
 * Since everything now was tied to a user, every created user had different permissions which needed testing.
 * This could have been avoided, had we realised how we can make the login process faster during testing.
 *
 * ### How it was solved:
 * We discovered that after logging in on our platform, we didn't get logged out after reloads, which meant we never had to log in unless prompted.
 *
 * With the auth set up in the project, our data was also made more secure.
 * Since everything now requires a user login, if you are not logged in, you can not access anything inside the project from the outside.
 *
 * ## Storage Bucket
 * This is what we use for handling images and bigger files like documents.
 * An issue with this was how to access the different files in the right places and how to do so correctly.
 *
 * What we should also think about was cost of having the storage. If there is too much traffic, it can rack up a large bill which we favoured in trying to avoid doing.
 *
 * ### How it was solved:
 * We figured out that with uploading the files, like images and documents, through the frontend, it created a file path we could use and an access token.
 * With this we were able to fetch everything with simple lines of code and no hassle. This is also a good approach, since every creation of elements is happening through the frontend.
 *
 *
 * ## Construction Tracking
 * The app needs a function in which a user can follow along with the contruction of their new home. This is mainly done in two different ways, daily reports and construction status.
 *
 * Daily reports is done by the construction manager, who writes a report and supports it with pictures taken throughout the day.
 *
 * Construction status is the difficulty. It needs to fetch data from an API from some software engineeres use to mock the house, which we can't access.
 *
 * ### How it was solved:
 * The report system solved itself, since it was a rather simple setup.
 *
 * The way the construction status was solved, was through a progress bar and a "complete step" demo button. This way we can simulate what it would be like, if we had access to the software.
 *
 * @category guides
 * @name Difficulties
 */