export default interface Other {
  id: string;
  workDay: number;
  workHour: number;
  monthlyLeave: number;
  accruate: number;
  dayOff: Array<number>;
  coefficient: number;
  isFormule: Boolean;
}
