import { Response } from 'express';

export default class HttpResponses {
  public static Unauthorized(res: Response) {
    return res.status(401).send('Unauthorized');
  }

  public static Conflict(res: Response) {
    return res.status(409).send('Conflict');
  }

  public static InternalServerError(res: Response) {
    return res.status(500).send('Internal Server Error');
  }

  public static NotFound(res: Response) {
    return res.status(404).send('Not Found');
  }

  public static Ok(res: Response) {
    return res.status(200).send('OK');
  }

  public static BadRequest(res: Response) {
    return res.status(400).send('Bad Request');
  }
}
