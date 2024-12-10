import { expect } from "vitest";
import { status, statusToReadable, readableToStatus, getDayOfWeek, getMonth } from "../src/services/utils";

describe('Checking utility functions', () => {
    it('Status array is correct', () => {
        expect(status).eqls(["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"]);
    })

    it('Get correct readable status from all caps', () => {
        let td = statusToReadable("TO_DO");
        let ip = statusToReadable("IN_PROGRESS");
        let ir = statusToReadable("IN_REVIEW");
        let d = statusToReadable("DONE");
        expect(td).eqls("To Do");
        expect(ip).eqls("In Progress");
        expect(ir).eqls("In Review");
        expect(d).eqls("Done");
    })

    it('Get correct status from readable version', () => {
        let td = readableToStatus("To Do");
        let ip = readableToStatus("In Progress");
        let ir = readableToStatus("In Review");
        let d = readableToStatus("Done");
        expect(td).eqls("TO_DO");
        expect(ip).eqls("IN_PROGRESS");
        expect(ir).eqls("IN_REVIEW");
        expect(d).eqls("DONE");
    })

    it('Get correct day of the week given a number', () => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        for(let i = 0; i < 7; i++){
            expect(getDayOfWeek(i)).eqls(days[i]);
        }
    })

    it('Get correct month given a number', () => {
	    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for(let i = 0; i < 12; i++){
            expect(getMonth(i)).eqls(months[i]);
        }
    })
})