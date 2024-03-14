export class HealthCheckResponse {
  build_number: any;
  build_time: any;

  constructor(build_number: any, build_time: any) {
    this.build_number = build_number;
    this.build_time = build_time;
  }
}
