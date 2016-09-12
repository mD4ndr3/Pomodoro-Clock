# The Project

The Pomodoro technique is a time management method which breaks down work into active intervals separated by short breaks. Typically work intervals are around 25 minutes. The theory is that this method of breaking down work time aids in uninterrupted periods of concentration allowing for greater productivity levels.

This webapp aids the user in setting their pomodoro intervals. Users can change the duration of the work and break intervals, start, pause and reset the session. The main display shows a countdown of time remaining in the current interval, indicates whether it is a work or break interval and plays a sound when the interval is completed.

# The Logic

Firstly I initialise functions to convert raw milliseconds into minutes and seconds for display (including leading zeros so that we always have a minimum of 2 digit seconds and numbers). We then set the click handers for increasing and decreasing the session lengths, ensuring this is only possible when the clock is inactive. The timer is updated to reflect the changes in session length

To run the clock we use the setInterval method to update the clock's display through calling the clockRunning function every second. Each time the function is called the time remaining in milliseconds is decremented by 1000 and the clock display is updated. If the time reaches 0, then we flip the clock to the break interval (or back to the work interval if we've just completed a work interval). Pausing and resetting the clock is handed through use of the clearInterval method and the sound played on completion of an interval is accessed via the small playSound plugin.
