import {
	RaccoonMeadowsVolunteers,
	RaccoonMeadowsActivity,
	raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';
	
import {
	WolfPointVolunteers,
	WolfPointActivity,
	wolfPointVolunteers,
} from './wolf-point-log';



/**
 * Types.
 */
type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;
	
type Volunteers = {
	id: number;
	name: string;
	activities: CombinedActivity[];
};
	


/**
 * Combine provided volunteers.
 * 
 * @param volunteers - Volunteers to combine.
 * @returns the volunteers combined with a concist data type patern.
 */
function combineVolunteers(
	volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
	return volunteers.map(volunteer => {
		let id = volunteer.id;
		if (typeof id === 'string') {
			id = parseInt(id)
		}
		return {
			id: id,
			name: volunteer.name,
			activities: volunteer.activities
		};
	});
}
	


/**
 * Check if hours are verified.
 * 
 * @param verified - String to check.
 * @returns boolean depending on the check result.
 */
function isVerified (verified: string|boolean) {
	if (typeof verified === 'string') {
		verified = verified === 'Yes' ? true : false;
	}
	return verified;
}



/**
 * Get hours in number format.
 * 
 * @param activity - Activity object to check.
 * @returns the time as number.
 */
function getHours (activity: CombinedActivity) {
	if ('hours' in activity) {
		return activity.hours;
	} else if ('time' in activity) {
		return activity.time;
	}
}
	


/**
 * Calculate hours for each volunteer.
 * 
 * @param volunteers - List of volunteers.
 * @returns a list of provided volunteers with calculated hours.
 */
function calculateHours(volunteers: Volunteers[]) {
	return volunteers.map((volunteer) => {
		let hours = 0;
	
		volunteer.activities.forEach((activity) => {
			if (isVerified(activity.verified)) {
				hours += getHours(activity);
			}
		});
	
		return {
			id: volunteer.id,
			name: volunteer.name,
			hours: hours,
		};
	});
}



/**
 * 
 * @param a - Sorting obj #1.
 * @param b - Sorting obj #2.
 * @returns the winner.
 */
function byHours(a, b) {
	return b.hours - a.hours;
}
	


/**
 * Extecution & testing.
 */
const combinedVolunteers = combineVolunteers(
	[].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);
	
const result = calculateHours(combinedVolunteers);
	
console.log(result.sort(byHours));
	
	