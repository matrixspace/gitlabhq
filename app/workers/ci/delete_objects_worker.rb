# frozen_string_literal: true

module Ci
  class DeleteObjectsWorker
    include ApplicationWorker
    include LimitedCapacity::Worker

    feature_category :continuous_integration
    idempotent!

    def perform_work(*args)
      service.execute
    end

    def remaining_work_count(*args)
      @remaining_work_count ||= service
        .remaining_batches_count(max_batch_count: remaining_capacity)
    end

    def max_running_jobs
      if ::Feature.enabled?(:ci_delete_objects_low_concurrency)
        2
      elsif ::Feature.enabled?(:ci_delete_objects_medium_concurrency)
        20
      elsif ::Feature.enabled?(:ci_delete_objects_high_concurrency)
        50
      else
        0
      end
    end

    private

    def service
      @service ||= DeleteObjectsService.new
    end
  end
end
