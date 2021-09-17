import * as core from '@actions/core';
import { exec } from '@actions/exec';
import * as github from '@actions/github';
import { Octokit } from '@octokit/rest';
import { dealStringToArr } from 'actions-util';
import axios from 'axios';

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;

async function run() {
  try {
    if (context.eventName !== 'pull_request_target') {
      const { owner, repo } = context.repo;
      core.info(`owner: ${owner}, repo: ${repo}`);
      const cis = core.getInput('ci').split('\n');
      let result;
      try {
        for (const ci of cis) {
          core.info(`[Run] ${ci}`);
          await exec(ci);
        }
        result = 'success';
      } catch (err) {
        const noticeTypes = dealStringToArr(core.getInput('notice-types'));
        const noticeTitle = core.getInput('notice-title') || `🤖 ${owner}/${repo} CI Notice`;
        let noticeBody =
          core.getInput('notice-body') ||
          '🚨 CI run failed, please check in time!\n\n```bash' +
            `\n${core.getInput('ci')}\n` +
            '```';
        const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${context.runId}`;
        noticeBody += `\nLogs: [${runUrl}](${runUrl})`;

        for (const noticeType of noticeTypes) {
          if (noticeType === 'dingding') {
            const dingdingToken = core.getInput('dingding-token');
            axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${dingdingToken}`, {
              msgtype: 'markdown',
              markdown: {
                title: noticeTitle,
                text: `# [${noticeTitle}](https://github.com/${owner}/${repo})\n\n${noticeBody}`,
              },
            });
          }

          if (noticeType === 'issue') {
            const labels = core.getInput('issue-labels');
            const assignees = core.getInput('issue-assignees');

            const params = {
              owner,
              repo,
              title: noticeTitle,
              body: noticeBody,
              labels: dealStringToArr(labels),
              assignees: dealStringToArr(assignees),
            };
            const { data } = await octokit.issues.create(params);
            core.info(`Actions: [create-issue][${data.number}] success!`);
          }
        }

        result = 'failed';
      }

      core.setOutput('result', result);
      core.info(`[${owner}/${repo}] CI check result: ${result}`);
    } else {
      core.setFailed(`This Action is not support "pull_request_target"!`);
    }
  } catch (err: any) {
    core.setFailed(err.message);
  }
}

run();
