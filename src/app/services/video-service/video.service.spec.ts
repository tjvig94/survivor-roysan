import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;
  const mockAxiosResponse: Observable<any> = of({
    data: {
      stuff: "abc"
    }
  })

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
