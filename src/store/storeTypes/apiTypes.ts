export interface HealthResponse {
  status: string;
}

export interface PredictResult {
  cleanliness: {
    prediction: 'clear' | 'dirty';
    confidence: number;
    probabilities: {
      clean: number;
      dirty: number;
    };
    threshold_used: number;
    raw_probability: number;
  };
  integrity: {
    prediction: 'intact' | 'damaged';
    confidence: number;
    probabilities: {
      intact: number;
      damaged: number;
    };
    threshold_used: number;
    raw_probability: number;
  };
  processing_time: number;
  timestamp: string;
}

export interface PredictResponse extends PredictResult {}

export interface BatchResponse {
  results: PredictResult[];
  batch_size: number;
  total_processing_time: number;
}

export interface updateThresholds {
  message: string;
  clean_threshold: number;
  damage_threshold: number;
}
