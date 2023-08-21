{{- define "helpers.list-env-variables"}}
{{- $secretName := printf "multi-backend-secrets-%s" .Values.appService.name -}}
{{- $env := .env -}}
{{- range $key, $val := $env.secret }}
- name: {{ $key }}
  valueFrom:
    secretKeyRef:
      name: {{ $secretName }}
      key: {{ $key }}
{{- end }}
{{- range $key, $val := $env.normal }}
- name: {{ $key }}
  value: {{ $val | quote }}
{{- end }}
{{- end }}

{{- define "helpers.get-common-health-livenessprobe"}}
{{- if not .Values.disableLivenessProbe }}
tcpSocket:
  port: {{ .Values.appService.containerPort }}
initialDelaySeconds: {{ .Values.global.commonHealthLivenessProbe.initialDelaySeconds }}
periodSeconds: {{ .Values.global.commonHealthLivenessProbe.periodSeconds }}
{{- end }}
{{- end }}

{{- define "helpers.get-common-health-readinessprobe"}}
{{- if not .Values.disableReadinessProbe }}
tcpSocket:
  port: {{ .Values.appService.containerPort }}
initialDelaySeconds: {{ .Values.global.commonHealthReadinessProbe.initialDelaySeconds }}
periodSeconds: {{ .Values.global.commonHealthReadinessProbe.periodSeconds }}
{{- end }}
{{- end }}

{{- define "helpers.wait-for-service"}}
{{- $context := index . 0 }}
{{- $serviceConfig := index . 1 }}
{{- $serviceToWait := index $context.Values "global" "initContainerWaits" $serviceConfig }}
- name: wait-for-{{ $serviceConfig }}
  image: "alpine"
  command:
    - 'sh'
    - '-c'
    - >
      until nc -z -w 2 {{ $context.Release.Name }}-{{ $serviceToWait.serviceName }} {{ $serviceToWait.servicePort }} && echo {{ $serviceToWait.serviceName }} ok;
        do sleep 2;
      done
{{- end }}

{{/*
Expand the name of the chart.
*/}}
{{- define "backend.name" -}}
{{- default .Chart.Name .Values.global.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "backend.fullname" -}}
{{- if .Values.global.fullnameOverride }}
{{- .Values.global.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.global.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "backend.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "backend.labels" -}}
helm.sh/chart: {{ include "backend.chart" . }}
{{ include "backend.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "backend.selectorLabels" -}}
app.kubernetes.io/name: {{ include "backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "backend.serviceAccountName" -}}
{{- if .Values.global.serviceAccount.create }}
{{- default (include "backend.fullname" .) .Values.global.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.global.serviceAccount.name }}
{{- end }}
{{- end }}
