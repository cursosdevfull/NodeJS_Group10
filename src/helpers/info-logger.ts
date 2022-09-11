export interface InfoLogger {
  traceId: string;
  typeElement: string;
  typeAction: string;
  message: string;
  request: string;
  datetime: Date;
}
